use std::{
    ops::Deref,
    sync::{Arc, Mutex},
};

use axum::{
    Json, Router,
    extract::Path,
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::{get, post},
};
use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
pub enum Position {
    Midscreen,
    CloseCorner,
    BackToCorner,
    Anywhere,
}

#[derive(Serialize, Deserialize)]
pub struct Combo {
    combo: String,
    damage: i32,
    meter: i32,
    position: Position,
    video_link: String,
    id: u32,
}

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    let mut reg = Handlebars::new();

    reg.register_template_file(
        "home",
        r"C:\Programming\Projects\combo_repo\templates\browse.hbs",
    )
    .unwrap();
    reg.register_template_file(
        "combo",
        r"C:\Programming\Projects\combo_repo\templates\combo.hbs",
    )
    .unwrap();
    let reg = reg;

    let list: Arc<Mutex<Vec<Combo>>> = Arc::new(Mutex::new(vec![Combo {
        combo: "2a 5b 5c".to_string(),
        damage: 200,
        meter: 8000,
        position: Position::Midscreen,
        video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
        id: 10,
    }]));

    let home_route = {
        let list = list.clone();
        let reg = reg.clone();
        get(move || async move {
            let list = list.lock().unwrap();
            let list = list.deref();

            let result = reg
                .render(
                    "home",
                    &json!({
                        "combos": list
                    }),
                )
                .unwrap();
            Html(result)
        })
    };

    let combo_route = {
        let list = list.clone();
        let reg = reg.clone();
        get(move |Path(combo_id): Path<u32>| async move {
            let list = list.lock().unwrap();
            let list = list.deref();

            let item = list.iter().find(|item| item.id == combo_id);

            if let Some(item) = item {
                let result = reg.render("combo", item).unwrap();
                Html(result).into_response()
            } else {
                StatusCode::NOT_FOUND.into_response()
            }
        })
    };

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", home_route)
        .route("/create", get(root))
        .route("/combo/{key}", combo_route);

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
