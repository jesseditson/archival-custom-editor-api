import "./editor-types";
import { ArchivalEditor } from "archival-custom-editor-types";

export * from "archival-custom-editor-types";

declare global {
  interface Window {
    ArchivalEditor: ArchivalEditor<any>;
    INJECTED_VALUES: Object;
  }
}
