import UIKit
import WebKit

class ViewController: UIViewController {
    private var webView: WKWebView!
    private let serverURLString = "http://192.168.0.23:3000" // CHANGE THIS

    override func viewDidLoad() {
        super.viewDidLoad()
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        if #available(iOS 10.0, *) {
            config.mediaTypesRequiringUserActionForPlayback = []
        }
        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth,.flexibleHeight]
        view.addSubview(webView)
        if let url = URL(string: serverURLString) {
            webView.load(URLRequest(url:url))
        }
    }
}
