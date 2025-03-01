use std::collections::HashMap;

use handlebars::Handlebars;
use serde::{Deserialize, Serialize};
use serde_json::json;

const DEVELOPMENT: &str = r#"
<script type="module">
import RefreshRuntime from 'http://localhost:{{port}}/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => { }
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>
<script type="module" src="http://localhost:{{port}}/@vite/client"></script>
<script type="module" src="http://localhost:{{port}}/{{entry}}"></script>
"#;

const PRODUCTION: &str = r#"
{{#each css}}
<link rel="stylesheet" href="/{{this}}" />
{{/each}}
<script type="module" src="/{{entry}}"></script>
"#;

pub const VITE_DIR: &str = "./app/dist";

const MANIFEST_PATH: &str = "./app/dist/.vite/manifest.json";

#[derive(Deserialize, Debug)]
#[allow(dead_code)]
struct ManifestEntry {
    file: String,
    src: String,
    name: Option<String>,
    #[serde(rename(deserialize = "isEntry"))]
    is_entry: Option<bool>,
    #[serde(default)]
    css: Vec<String>,
    #[serde(default)]
    assets: Vec<String>,
    #[serde(default)]
    imports: Vec<String>,
}

fn format_stylesheet(target: &String) -> String {
    format!(r#"<link rel="stylesheet" href="{}" />"#, target)
}

pub fn vite_head_block(reg: &Handlebars) -> String {
    const ENTRY: &str = "src/main.tsx";

    if cfg!(debug_assertions) {
        reg.render_template(DEVELOPMENT, &json!({ "entry": ENTRY, "port": 5173 }))
            .unwrap()
    } else {
        let manifest: HashMap<String, ManifestEntry> =
            serde_json::from_reader(std::fs::File::open(MANIFEST_PATH).unwrap()).unwrap();
        let main = &manifest[ENTRY];

        let mut css = vec![];

        let mut recursive = main.imports.clone();
        recursive.push(ENTRY.to_string());

        while let Some(import) = recursive.pop() {
            let entry = &manifest[&import];
            recursive.extend(entry.imports.iter().cloned());

            css.extend(entry.css.iter());
        }

        reg.render_template(PRODUCTION, &json!({ "entry": main.file, "css": css }))
            .unwrap()
    }
}
