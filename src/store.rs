use tokio::sync::{mpsc, oneshot};

use crate::combo::{Combo, ComboWithId, Position};

pub enum StoreMessage {
    GetAll(oneshot::Sender<Vec<ComboWithId>>),
    GetOne(usize, oneshot::Sender<Option<ComboWithId>>),
    Add(Combo, oneshot::Sender<Option<usize>>),
}

#[derive(Clone)]
pub struct StoreHandle {
    tx: mpsc::Sender<StoreMessage>,
}

impl StoreHandle {
    pub async fn get_all(&self) -> Vec<ComboWithId> {
        let (tx, rx) = oneshot::channel();
        let _ = self.tx.send(StoreMessage::GetAll(tx)).await;
        rx.await.unwrap()
    }
    pub async fn get(&self, id: usize) -> Option<ComboWithId> {
        let (tx, rx) = oneshot::channel();
        let _ = self.tx.send(StoreMessage::GetOne(id, tx)).await;
        rx.await.unwrap()
    }
    pub async fn add(&self, data: Combo) -> Option<usize> {
        let (tx, rx) = oneshot::channel();
        let _ = self.tx.send(StoreMessage::Add(data, tx)).await;
        rx.await.unwrap()
    }
}

pub fn start() -> StoreHandle {
    let (tx, mut rx) = mpsc::channel(10);

    tokio::spawn(async move {
        let mut data = vec![
            Combo {
                combo: "2a 5b 5c".to_string(),
                damage: 521,
                meter: 2040,
                position: Position::Midscreen,
                video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
                grd: 150,
                description: "Nothing to say".to_string(),
            },
            Combo {
                combo: "5a 5b 5c 623a".to_string(),
                damage: 2207,
                meter: 3256,
                position: Position::CloseCorner,
                video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
                grd: -125,
                description: "Nothing to say".to_string(),
            },Combo {
                combo: "5B > 5C > 623A > 3B^1 > ic.jC > j.2C > 22A > 5CC > 623A > 66C(3) > B Pin"
                    .to_string(),
                damage: 3324,
                meter: 8217,
                position: Position::Midscreen,
                video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
                grd: 0,
                description: "^1 You need to start holding your B Pin as soon as you press 3B otherwise you will not be able to get level 4 B Pin.  This is a huge damage boost.".to_string(),
            }
        ];

        while let Some(message) = rx.recv().await {
            match message {
                StoreMessage::GetAll(tx) => {
                    let _ = tx.send(
                        data.iter()
                            .cloned()
                            .enumerate()
                            .map(|(id, combo)| ComboWithId { id, combo })
                            .collect(),
                    );
                }
                StoreMessage::GetOne(id, tx) => {
                    let item = data.get(id).cloned().map(|combo| ComboWithId { id, combo });

                    let _ = tx.send(item);
                }
                StoreMessage::Add(new, tx) => {
                    let id = data.len();
                    data.push(new);
                    let _ = tx.send(Some(id));
                }
            }
            //
        }
    });

    StoreHandle { tx }
}
