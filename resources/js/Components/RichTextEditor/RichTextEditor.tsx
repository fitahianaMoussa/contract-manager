import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faArrowRotateLeft,
    faArrowRotateRight,
    faBold,
    faItalic,
    faStrikethrough,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { mergeRegister } from "@lexical/utils";
import {
    $getSelection,
    $insertNodes,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import "./RichTextEditor.css";

const theme = {
    code: "editor-code",
    heading: {
        h1: "editor-heading-h1",
        h2: "editor-heading-h2",
        h3: "editor-heading-h3",
        h4: "editor-heading-h4",
        h5: "editor-heading-h5",
    },
    image: "editor-image",
    link: "editor-link",
    list: {
        listitem: "editor-listitem",
        nested: {
            listitem: "editor-nested-listitem",
        },
        ol: "editor-list-ol",
        ul: "editor-list-ul",
    },
    ltr: "ltr",
    paragraph: "editor-paragraph",
    placeholder: "editor-placeholder",
    quote: "editor-quote",
    rtl: "rtl",
    text: {
        bold: "editor-text-bold",
        code: "editor-text-code",
        hashtag: "editor-text-hashtag",
        italic: "editor-text-italic",
        overflowed: "editor-text-overflowed",
        strikethrough: "editor-text-strikethrough",
        underline: "editor-text-underline",
        underlineStrikethrough: "editor-text-underlineStrikethrough",
    },
};

const editorConfig = {
    namespace: "MyEditor",
    nodes: [],
    theme,
    onError(error: Error) {
        console.error(error);
    },
};

function Placeholder({ text }: { text?: string }) {
    return (
        <div className="editor-placeholder select-none text-gray-500 overflow-hidden absolute text-ellipsis top-4 left-2 text-base inline-block pointer-events-none">
            {text}
        </div>
    );
}

type RichTextEditorProps = {
    className?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
};

export default function RichTextEditor({
    className,
    placeholder,
    onChange,
}: RichTextEditorProps) {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div
                className={
                    "editor-container text-left relative font-normal leading-5 dark:text-gray-300 rounded-md shadow-sm " +
                    className
                }
            >
                <ToolbarPlugin />
                <div className="editor-inner rounded-b-md bg-white dark:bg-gray-900 relative caret-slate-500">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="editor-input resize-none overflow-y-auto min-h-80 text-base relative px-4 py-2 outline-none" />
                        }
                        placeholder={<Placeholder text={placeholder} />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <HtmlPlugin onHtmlChanged={onChange} />
                </div>
            </div>
        </LexicalComposer>
    );
}

const LowPriority = 1;

function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority,
            ),
        );
    }, [editor, updateToolbar]);

    return (
        <div
            className="toolbar rounded-t-md bg-gray-300 dark:bg-slate-700 mb-[1px] flex p-1 items-center divide-x divide-gray-700 dark:divide-gray-300"
            ref={toolbarRef}
        >
            <div className="flex pr-1">
                <button
                    disabled={!canUndo}
                    onClick={() => {
                        editor.dispatchCommand(UNDO_COMMAND, undefined);
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced"
                    aria-label="Undo"
                >
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                </button>
                <button
                    disabled={!canRedo}
                    onClick={() => {
                        editor.dispatchCommand(REDO_COMMAND, undefined);
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center"
                    aria-label="Redo"
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
            <div className="flex px-1">
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                    }}
                    className={
                        "toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced " +
                        (isBold ? "active" : "")
                    }
                    aria-label="Format Bold"
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                    }}
                    className={
                        "toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced " +
                        (isItalic ? "active" : "")
                    }
                    aria-label="Format Italics"
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            "underline",
                        );
                    }}
                    className={
                        "toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced " +
                        (isUnderline ? "active" : "")
                    }
                    aria-label="Format Underline"
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            "strikethrough",
                        );
                    }}
                    className={
                        "toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced " +
                        (isStrikethrough ? "active" : "")
                    }
                    aria-label="Format Strikethrough"
                >
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>
            </div>
            <div className="flex pl-1">
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced"
                    aria-label="Left Align"
                >
                    <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_ELEMENT_COMMAND,
                            "center",
                        );
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced"
                    aria-label="Center Align"
                >
                    <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center mr-[2px] spaced"
                    aria-label="Right Align"
                >
                    <FontAwesomeIcon icon={faAlignRight} />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_ELEMENT_COMMAND,
                            "justify",
                        );
                    }}
                    className="toolbar-item border-none flex bg-transparent rounded-md p-2 cursor-pointer items-center"
                    aria-label="Justify Align"
                >
                    <FontAwesomeIcon icon={faAlignJustify} />
                </button>
            </div>
        </div>
    );
}

function HtmlPlugin({
    onHtmlChanged,
}: {
    onHtmlChanged?: (html: string) => void;
}) {
    const [editor] = useLexicalComposerContext();

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (!isFirstRender) return;

        setIsFirstRender(false);

        editor.update(() => {
            const parser = new DOMParser();
            const dom = parser.parseFromString("", "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            $insertNodes(nodes);
        });
    }, []);

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    onHtmlChanged?.($generateHtmlFromNodes(editor));
                });
            }}
        />
    );
}
