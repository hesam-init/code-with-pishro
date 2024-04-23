import * as vscode from "vscode";
import { FacesList } from "./constants/faces/index";
import { getErrorsCount } from "./utils/errors";

const html = String.raw;

function setHtml(errorCount: number, asset: vscode.Uri, styles: vscode.Uri) {
	const htmlContent = html`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="${styles}" />
      </head>
      <body>
        <section>
          <img class="pishroFace" src="${asset}" alt="" />
        </section>

        <section class="errorContainer">
          <h1>تعداد خطا :</h1>
          <h1>${errorCount}</h1>
        </section>
      </body>
    </html>
  `;

	return htmlContent;
}

export function activate(context: vscode.ExtensionContext) {
	const provider = new CustomSidebarViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics(() => provider.changed()),
	);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			CustomSidebarViewProvider.viewType,
			provider,
		),
	);
}

class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = "code-with-pishro.openview";
	view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri) {}

	resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
		this.view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
		};

		this.changed();
	}

	changed() {
		if (this.view) {
			this.view.webview.html = this.getHtmlContent(this.view.webview);
		}

		return null;
	}

	private getHtmlContent(webview: vscode.Webview): string {
		const errorsCount = getErrorsCount();

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const face = FacesList.find((face) => errorsCount >= face.minErrors)!;

		const currentFace = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, "assets", "images", face.asset),
		);

		const styles = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, "assets", "styles", "main.css"),
		);

		return setHtml(errorsCount, currentFace, styles);
	}
}
