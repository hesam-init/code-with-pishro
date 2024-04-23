import * as vscode from "vscode";

export function getErrorsCount(): number {
	const activeTextEditor: vscode.TextEditor | undefined =
		vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		return 0;
	}
	const document: vscode.TextDocument = activeTextEditor.document;

	const numErrors = vscode.languages
		.getDiagnostics(document.uri)
		.filter((d) => d.severity === vscode.DiagnosticSeverity.Error).length;

	return numErrors;
}
