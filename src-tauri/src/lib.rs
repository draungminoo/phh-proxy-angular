use tauri::menu::Menu;
use tauri::menu::MenuItem;

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // menu
    let home = MenuItem::new("home".to_string(), "Home");
    let menu = Menu::new().add_item(home);

    tauri::Builder::default()
        .menu(menu)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_proxy])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
