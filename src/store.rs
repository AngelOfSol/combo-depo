use tokio::sync::{mpsc, oneshot};

use crate::{Combo, Position};

type ComboType = Combo;

pub enum StoreMessage {
    GetAll(oneshot::Sender<Vec<ComboType>>),
    GetOne(u32, oneshot::Sender<Option<ComboType>>),
    Add(ComboType, oneshot::Sender<Option<u32>>),
}

#[derive(Clone)]
pub struct StoreHandle {
    tx: mpsc::Sender<StoreMessage>,
}

impl StoreHandle {
    pub async fn get_all(&self) -> Vec<ComboType> {
        let (tx, rx) = oneshot::channel();
        let _ = self.tx.send(StoreMessage::GetAll(tx)).await;
        rx.await.unwrap()
    }
    pub async fn get(&self, id: u32) -> Option<ComboType> {
        let (tx, rx) = oneshot::channel();
        let _ = self.tx.send(StoreMessage::GetOne(id, tx)).await;
        rx.await.unwrap()
    }
    pub async fn add(&self, data: ComboType) -> Option<u32> {
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
                damage: 200,
                meter: 8000,
                position: Position::Midscreen,
                video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
                id: 0,
                grd: 150,
            },
            Combo {
                combo: "5a 5b 5c 623a".to_string(),
                damage: 200,
                meter: 8000,
                position: Position::CloseCorner,
                video_link: "https://www.youtube.com/watch?v=upM0bNNvUWU".to_string(),
                id: 1,
                grd: -125,
            },
        ];

        while let Some(message) = rx.recv().await {
            match message {
                StoreMessage::GetAll(tx) => {
                    let _ = tx.send(data.clone());
                }
                StoreMessage::GetOne(idx, tx) => {
                    let item = data.iter().find(|item| item.id == idx);

                    let _ = tx.send(item.cloned());
                }
                StoreMessage::Add(new, tx) => {
                    let id = new.id;
                    data.push(new);
                    let _ = tx.send(Some(id));
                }
            }
            //
        }
    });

    StoreHandle { tx }
}
