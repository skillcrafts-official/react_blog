import styles from './PostEditor.module.css'

import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TipTapEditorToolbar from '../../components/ui/TipTapEditor/TipTapEditorToolbar'
import TipTapFloatingMenu from '../../components/ui/TipTapEditor/TipTapFloatingMenu'
import TipTapBubleMenu from '../../components/ui/TipTapEditor/TipTapBubleMenu'
import ActionButton from '../../components/ui/Button/ActionButton'
import Image from '@tiptap/extension-image'
import { useCallback } from 'react'

const extensions = [StarterKit.configure({
    heading: {
        levels: [1, 2, 3],
        HTMLAttributes: {
            class: "heading-custom"
        }
    },
    paragraph: {
        HTMLAttributes: {
            class: "paragraph-custom"
        }
    },
    code: {
        HTMLAttributes: {
            class: "inline-code-custom",
        }
    },
    codeBlock: {
        HTMLAttributes: {
            class: "block-code-custom"
        }
    },
    blockquote: {
        HTMLAttributes: {
            class: "blockquote-custom"
        }
    },
    bulletList: {
      HTMLAttributes: {
        class: "bullet-list-custom"
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: "ordered-list-custom"
      }
    },
    listItem: {
      HTMLAttributes: {
        class: "list-item-custom"
      }
    }
}), Image]

function PostEditor() {
    const editor = useEditor({
        extensions,
        content: `
        <h1>
          Заголовок 1
        </h1>
        <p>
          Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац Простой абзац 
        </p>
        <h2>
          Заголовок 2
        </h2>
        <pre><code>// Абзац с блоком кода
function PostEditor() {
  const editor = userEditor({
    extensions,
    content: ''
  })
}</code></pre>
        <h3>
          Заголовок 3
        </h3>
        <blockquote>
          Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой Абзац с цитатой
        </blockquote>
        <p>
          <b>Жирный шрифт</b>, <i>курсивный шрифт</i>, <s>зачёркнутый шрифт</s>, <code>моноширинный шрифт для фрагмента кода</code>
        </p>
        <p>
          Маркированный список
        </p>
        <ul>
          <li>
            Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1 Маркированный пункт 1
          </li>
          <li>Маркированный пункт 2</li>
          <li>Маркированный пункт 3</li>
        </ul>
        <p>
          Нумерованный список
        </p>
        <ol>
          <li>
            Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 Нумерованный пункт 1 
          </li>
          <li>Нумерованный пункт 2</li>
          <li>Нумерованный пункт 3</li>
        </ol>
        `,
    })
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })
    
    return (
      <div className={`flex flex-col my-7 bg-[#202020ff] shadow-simple-post rounded-[12px] ${styles['post-editor']}`}>
        <div className="sticky flex flex-col gap-10 p-6 bg-[#202020ff] rounded-t-[12px]">
        {/* <div className='flex flex-col gap-10 w-200 my-7'> */}
            <TipTapEditorToolbar editor={editor} editorState={editorState}/>
            {/* <TipTapFloatingMenu editor={editor} editorState={editorState}/> */}
            <TipTapBubleMenu editor={editor} editorState={editorState}/>
            
        </div>
        <EditorContent editor={editor}/>
        <div className="flex flex-col gap-10 p-6">
            <section className='section'>
                <ActionButton>Сохранить</ActionButton>
                <ActionButton>Опубликовать</ActionButton>
            </section>
            
        {/* </div> */}
        </div>
      </div>
    )
}

export default PostEditor
