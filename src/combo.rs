use serde::{Deserialize, Serialize};
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
    pub combo: String,
    pub damage: i32,
    pub meter: i32,
    pub position: Position,
    pub video_link: String,
    pub grd: i32,
    pub description: String,
}

#[derive(Serialize, Deserialize, Clone, TS)]
#[ts(export)]
pub struct ComboWithId {
    pub id: usize,
    pub combo: Combo,
}
