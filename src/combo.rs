use std::collections::BTreeSet;

pub struct Combo {
    metadata: Metadata,
    moveList: Vec<Move>,
    annotations: Vec<(usize, Annotation)>,
}

pub struct Annotation {}
pub struct Metadata {}

pub enum Move {
    Standard {
        motion: Motion,
        buttons: BTreeSet<Button>,
    },
}

#[derive(PartialEq, Eq, PartialOrd, Ord)]
pub struct Button(pub String);
pub struct Motion(pub String);
