import { Theme } from "@emotion/react";
import { cx } from "@emotion/css";
import { IconButton, Tooltip } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useState, MouseEvent, useMemo, useCallback } from "react";

import TableMenuDialog from "./TableMenuDialog";
import LinkDialog from "./LinkDialog";
import Heading from "./Heading";
import ColorPicker from "./ColorPicker";
import { IEditorToolbar } from "../type";
import { defaultEditorToolbar, showTextEditorToolbarMenu } from "../utils/app.utils";
import YoutubeDialog from "./YoutubeDialog";
import Bold from "../icons/Bold";
import Italic from "../icons/Italic";
import Strike from "../icons/Strike";
import Underline from "../icons/Underline";
import Link from "../icons/Link";
import BulletList from "../icons/BulletList";
import OrderedList from "../icons/OrderedList";
import AlignLeft from "../icons/AlignLeft";
import AlignCenter from "../icons/AlignCenter";
import AlignRight from "../icons/AlignJustify";
import AlignJustify from "../icons/AlignRight";
import Quote from "../icons/Quote";
import Code from "../icons/Code";
import Table from "../icons/Table";
import Youtube from "../icons/Youtube";
import Undo from "../icons/Undo";
import Redo from "../icons/Redo";
import Mention from "../icons/Mention";
import Icon from "../icons/Icon";

const classes = {
  toolbar: (theme: Theme) => ({
    marginTop: -1,
    borderTop: "1px solid " + theme.palette.grey[300],
    paddingLeft: 8,
    paddingRight: 8,
  }),
  button: (isActive: boolean, split: boolean) => (theme: Theme) => ({
    borderRadius: 0,
    border: "none",
    borderRight: split ? `1px solid ${theme.palette.grey[300]}` : "none",
    cursor: "pointer",
    height: 24,
    width: 24,
    padding: 18,
    backgroundColor: isActive ? theme.palette.grey[100] : "#fff",
    "&.Mui-disabled": {
      opacity: 0.4
    }
  }),
  splittedBorder: (theme: Theme) => {
    const borderColor = theme.palette.grey[300];
    return {
      borderRight: "1px solid " + borderColor
    };
  },
};

export type ToolbarProps = {
  editor: Editor;
  /**
   * override the default class
   */
  className?: string;
    /**
   * toolbar (each icon) to be displayed
   *
   * possible values are: [
   * "heading", "bold", "italic", "strike", "link", "underline", "image", "code",
   * "orderedList", "bulletList", "align", "codeBlock", "blockquote", "table",
   * "history", "youtube", "color", "mention"
   * ]
   *
   * default values is all the above
   */
  toolbar?: IEditorToolbar[];
};

const Toolbar = ({
  editor,
  className,
  toolbar = defaultEditorToolbar
}: ToolbarProps) => {
  const [openLinkDialog, setOpen] = useState<boolean>(false);

  const toggleLinkDialog = useCallback(() => setOpen(!openLinkDialog), [openLinkDialog]);

  const [openYoutubeDialog, setOpenYoutubeDialog] = useState<boolean>(false);

  const toggleYoutubeDialog = useCallback(() => setOpenYoutubeDialog(!openYoutubeDialog), [openYoutubeDialog]);

  const [tableAnchorEl, setTableAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenTableMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setTableAnchorEl(event.currentTarget);
  }, []);

  const handleCloseTableMenu = () => {
    setTableAnchorEl(null);
  };

  const menus = useMemo(() => {
    return [
      {
        name: "bold",
        icon: Bold,
        iconSize: 12,
        onClick: () => editor.chain().focus().toggleBold().run(),
        disabled: !editor.can().chain().focus().toggleBold().run(),
        tooltip: 'Bold'
      },
      {
        name: "italic",
        icon: Italic,
        iconSize: 12,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        tooltip: 'Italic'
      },
      {
        name: "strike",
        icon: Strike,
        iconSize: 14,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        tooltip: 'Strike through'
      },
      {
        name: "underline",
        iconSize: 14,
        icon: Underline,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        tooltip: 'Underline'
      },
      {
        name: "link",
        icon: Link,
        onClick: toggleLinkDialog,
        disabled: false,
        split: true,
        tooltip: 'Link'
      },
      // order
      {
        name: "bulletList",
        icon: BulletList,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        disabled: !editor.can().chain().focus().toggleBulletList().run(),
        tooltip: 'Bullet list'
      },
      {
        name: "orderedList",
        icon: OrderedList,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
        split: true,
        tooltip: 'Ordered list',
        iconSize: 14
      },
      // alignment
      {
        name: "align-left",
        icon: AlignLeft,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        disabled: false,
        active: { textAlign: "left" },
        group: "align",
        tooltip: 'Left align'
      },
      {
        name: "align-center",
        icon: AlignCenter,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        disabled: false,
        active: { textAlign: "center" },
        group: "align",
        tooltip: 'Center align'
      },
      {
        name: "align-right",
        icon: AlignRight,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        disabled: false,
        active: { textAlign: "right" },
        group: "align",
        tooltip: 'Right align'
      },
      {
        name: "align-justify",
        icon: AlignJustify,
        onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        disabled: false,
        active: { textAlign: "justify" },
        split: true,
        group: "align",
        tooltip: 'Justify align'
      },
      {
        name: "blockquote",
        icon: Quote,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        disabled: false,
        tooltip: 'Block quote',
        iconSize: 16
      },
      {
        name: "codeBlock",
        icon: Code,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        disabled: false,
        split: true,
        tooltip: 'Code block'
      },
      {
        name: "table",
        icon: Table,
        onClick: (event: MouseEvent<HTMLElement>) => {
          handleOpenTableMenu(event);
        },
        disabled: false,
        split: true,
        tooltip: 'Table'
      },
      {
        name: "youtube",
        icon: Youtube,
        onClick: toggleYoutubeDialog,
        disabled: false,
        split: true,
        tooltip: 'Youtube'
      },
      {
        name: "undo",
        icon: Undo,
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().undo(),
        default: true, // always display
        tooltip: 'Undo'
      },
      {
        name: "redo",
        icon: Redo,
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().redo(),
        default: true, // always display
        split: true,
        tooltip: 'Redo'
      }
    ]
  }, [
    editor,
    // for some unknown reason, the history is not being updated
    // so we need to force the update
    editor.can().undo,
    editor.can().redo,
    toggleLinkDialog,
    toggleYoutubeDialog,
    handleOpenTableMenu
  ]);

  return (
    <div className={cx(className, 'flexRow center')} css={classes.toolbar}>
      {/* heading */}
      {showTextEditorToolbarMenu(toolbar, "heading") && <Heading editor={editor} />}

      {/* other options */}
      {menus.map((menu, index) => (
        showTextEditorToolbarMenu(toolbar, menu) && (
            <Tooltip title={menu.tooltip} key={menu.name + index}>
              <IconButton
                onClick={menu.onClick}
                disabled={menu.disabled}
                css={classes.button(
                  // the order is important
                  editor.isActive(menu.active || menu.name),
                  !!menu.split
                )}
              >
                <Icon size={menu.iconSize}>
                  <menu.icon />
                </Icon>
              </IconButton>
            </Tooltip>
          )
      ))}

      {/* mention */}
      {showTextEditorToolbarMenu(toolbar, "mention") && (
        <Tooltip title="Mention user">
          <IconButton
            onClick={() => {
              editor.chain().focus().insertContent("@").run();
            }}
            css={{ borderRadius: 2 }}
          >
            <Icon size={15}>
              <Mention />
            </Icon>
          </IconButton>
        </Tooltip>
      )}

      {/* youtube dialog */}
      {showTextEditorToolbarMenu(toolbar, "link") && (
        <LinkDialog
          editor={editor}
          open={openLinkDialog}
          onClose={toggleLinkDialog}
        />
      )}

      {/* youtube dialog */}
      {showTextEditorToolbarMenu(toolbar, "youtube") && (
        <YoutubeDialog
          editor={editor}
          open={openYoutubeDialog}
          onClose={toggleYoutubeDialog}
        />
      )}

      {/* color picker */}
      {showTextEditorToolbarMenu(toolbar, "color") && (
          <ColorPicker editor={editor} />
      )}

      {/* table menu to be opened */}
      {showTextEditorToolbarMenu(toolbar, "table") && (
        <TableMenuDialog
          editor={editor}
          anchorEl={tableAnchorEl}
          onClose={handleCloseTableMenu}
        />
      )}
    </div>
  );
};

export default Toolbar;
