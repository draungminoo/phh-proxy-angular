#[tauri::command]
fn set_proxy(ip: &str, port: &str) {
    // Set the environment variables for the proxy
    let address = ip.to_owned() + ":" + port;
    std::env::set_var("HTTP_PROXY", "http://".to_owned() + &address);
    std::env::set_var("HTTPS_PROXY", "https://".to_owned() + &address);
    std::env::set_var(
        "WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS",
        "--proxy-server=".to_owned() + &address,
    );

    println!("Address: {}", address);
}

#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_proxy, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
