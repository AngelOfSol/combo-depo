use handlebars::Handlebars;
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
<script type="module" src="http://localhost:{{port}}/src/main.tsx"></script>
"#;

pub fn vite_head_block(reg: &Handlebars) -> String {
    if cfg!(debug_assertions) {
        reg.render_template(DEVELOPMENT, &json!({ "port": 5173 }))
            .unwrap()
    } else {
        "".to_string()
    }
}
