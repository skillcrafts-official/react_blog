import styles from './TipTapEditorToolbar.module.css'
import { FloatingMenu } from '@tiptap/react/menus'

function TipTapFloatingMenu({ editor, editorState }) {
  const variants = {
    primary: `${styles.toolbar}  ${styles.primary}`
  }
  return (
    <FloatingMenu editor={editor}>
      <div className={`sticky ${styles.toolbar}`}>
        <section className={styles.verticalFormatPanel}>
            <button
              title='Абзац'
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`${editorState.isParagraph ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
              &para;
            </button>
            <button
              title='Заголовок уровень 1'
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`${editorState.isHeading1 ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
              H1
            </button>
            <button
              title='Заголовок уровень 2'
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`${editorState.isHeading2 ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
              H2
            </button>
            <button
              title='Заголовок уровень 3'
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`${editorState.isHeading3 ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
              H3
            </button>
            <button
              title='Абзац кода'
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`${editorState.isCodeBlock ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
              <code className={styles.codeBlock}>АБЗАЦ КОДА</code>
            </button>
            <button
              title='Цитата'
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${editorState.isBlockquote ? 'is-active' : ''} ${variants.primary}`}
            >
              <blockquote className={styles.blockquoteFormat}>ЦИТАТА</blockquote>
            </button>
            <button
              title='Маркированный список'
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${editorState.isBulletList ? 'is-active' : ''} ${variants.primary}`}
            >
              <ul className={styles.ulFormat}>
                <li>&bull; ...</li>
                <li>&bull; ...</li>
              </ul>
            </button>
            <button
              title='Нумерованный список'
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${editorState.isOrderedList ? 'is-active' : ''} ${variants.primary}`}
            >
              <ol className={styles.ulFormat}>
                <li>1 ...</li>
                <li>2 ...</li>
              </ol>
            </button>
          </section>
      </div>
    </FloatingMenu>
  )
}

export default TipTapFloatingMenu
