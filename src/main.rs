pub mod combo;
pub mod response;
pub mod store;
pub mod vite;

use crate::{combo::Combo, response::SubmittedCombo, store::StoreHandle};
use axum::{
    Json, Router,
    extract::{Path, State},
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::{get, post},
};
use handlebars::Handlebars;
use serde_json::json;
use tower_http::services::ServeDir;

#[derive(Clone)]
struct HandlerState<'a> {
    reg: Handlebars<'a>,
    header: String,
    store: StoreHandle,
}

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    let mut reg = Handlebars::new();
    #[cfg(debug_assertions)]
    reg.set_dev_mode(true);

    reg.register_template_file(
        "home",
        r"C:\Programming\Projects\combo_repo\templates\browse.hbs",
    )
    .unwrap();
    reg.register_template_file(
        "create",
        r"C:\Programming\Projects\combo_repo\templates\create.hbs",
    )
    .unwrap();
    reg.register_template_file(
        "combo",
        r"C:\Programming\Projects\combo_repo\templates\combo.hbs",
    )
    .unwrap();

    let state = HandlerState {
        header: vite::vite_head_block(&reg),
        store: store::start(),
        reg,
    };

    let serve_dir = ServeDir::new("app/dist");
    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(home))
        .route("/alternative", get(home))
        .route("/create", get(create))
        .route("/combo/{key}", get(combo))
        .route("/api/create", post(create_combo))
        .fallback_service(serve_dir)
        .with_state(state);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn create_combo(
    State(state): State<HandlerState<'_>>,
    Json(combo): Json<Combo>,
) -> Json<SubmittedCombo> {
    println!("{:?}", &combo);
    let result = state.store.add(combo).await;
    Json(SubmittedCombo {
        redirect_id: result.unwrap(),
    })
}

async fn home(State(state): State<HandlerState<'_>>) -> Html<String> {
    let list = state.store.get_all().await;

    let result = state
        .reg
        .render(
            "home",
            &json!({
                "rawJson": serde_json::to_string_pretty(&list).unwrap(),
                "htmlHeader": state.header,
            }),
        )
        .unwrap();
    Html(result)
}

async fn combo(State(state): State<HandlerState<'_>>, Path(combo_id): Path<usize>) -> Response {
    let item = state.store.get(combo_id).await;
    if let Some(item) = item {
        let result = state
            .reg
            .render(
                "combo",
                &json!({
                    "rawJson": serde_json::to_string_pretty(&item).unwrap(),
                    "htmlHeader": state.header,
                }),
            )
            .unwrap();
        Html(result).into_response()
    } else {
        StatusCode::NOT_FOUND.into_response()
    }
}

async fn create(State(state): State<HandlerState<'_>>) -> Html<String> {
    let result = state
        .reg
        .render(
            "create",
            &json!({
                "rawJson": "null",
                "htmlHeader": state.header,
            }),
        )
        .unwrap();
    Html(result)
}
