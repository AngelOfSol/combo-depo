pub mod combo;
pub mod store;
pub mod vite;

use axum::{
    Router,
    extract::Path,
    http::StatusCode,
    response::{Html, IntoResponse},
    routing::get,
};
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use serde_json::json;
use tower_http::services::ServeDir;
use ts_rs::TS;

#[derive(Serialize, Deserialize, Copy, Clone, TS)]
#[ts(export)]
pub enum Position {
    Midscreen,
    CloseCorner,
    BackToCorner,
    Anywhere,
}

#[derive(Serialize, Deserialize, Clone, TS)]
#[ts(export)]
pub struct Combo {
    combo: String,
    damage: i32,
    meter: i32,
    position: Position,
    video_link: String,
    id: u32,
    grd: i32,
}

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    let mut reg = Handlebars::new();
    #[cfg(debug_assertions)]
    reg.set_dev_mode(true);

    let html_header = vite::vite_head_block(&reg);

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
    let reg = reg;

    let store = store::start();

    let home_route = {
        let reg = reg.clone();
        let store = store.clone();
        let html_header = html_header.clone();
        get(async move || {
            let list = store.get_all().await;

            let result = reg
                .render(
                    "home",
                    &json!({
                        "rawJson": serde_json::to_string_pretty(&list).unwrap(),
                        "htmlHeader": html_header,
                    }),
                )
                .unwrap();
            Html(result)
        })
    };

    let combo_route = {
        let reg = reg.clone();
        let store = store.clone();
        let html_header = html_header.clone();

        get(async move |Path(combo_id)| {
            let item = store.get(combo_id).await;
            if let Some(item) = item {
                let result = reg
                    .render(
                        "combo",
                        &json!({
                            "rawJson": serde_json::to_string_pretty(&item).unwrap(),
                            "htmlHeader": html_header,
                        }),
                    )
                    .unwrap();
                Html(result).into_response()
            } else {
                StatusCode::NOT_FOUND.into_response()
            }
        })
    };

    let create_route = {
        let reg = reg.clone();
        let html_header = html_header.clone();
        get(async move || {
            let result = reg
                .render(
                    "create",
                    &json!({
                        "rawJson": "null",
                        "htmlHeader": html_header,
                    }),
                )
                .unwrap();
            Html(result)
        })
    };

    let serve_dir = ServeDir::new("app/dist");
    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", home_route.clone())
        .route("/alternative", home_route)
        .route("/create", create_route)
        .route("/combo/{key}", combo_route)
        .fallback_service(serve_dir);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// basic handler that responds with a static string
async fn root() -> Html<&'static str> {
    Html(
        r#"<html prefix="og: https://ogp.me/ns#">
        <head>
        <title>The Rock (1996)</title>
        <meta property="og:title" content="The Rock" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />

        </head>
        <body> <h1>NEW PAAGE</h1></body>
        </html>
    "#,
    )
}
