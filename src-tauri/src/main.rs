// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tokio::main]
async fn main() {
    // Set the environment variables for the proxy
    std::env::set_var("HTTP_PROXY", "http://172.33.157.252:8118");
    std::env::set_var("HTTPS_PROXY", "http://172.33.157.252:8118");
    std::env::set_var(
        "WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS",
        "--proxy-server=172.33.157.252:8118",
    );

    phh_proxy_lib::run()
}
