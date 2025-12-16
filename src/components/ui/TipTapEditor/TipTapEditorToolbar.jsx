import { useCallback } from 'react'
import styles from './TipTapEditorToolbar.module.css'

function TipTapEditorToolbar({ editor, editorState }) {
  const variants = {
    primary: `${styles.toolbar}  ${styles.primary}`
  }
  const addImage = useCallback(() => {
      const url = window.prompt('URL')
  
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }, [editor])
  
    if (!editor) {
      return null
    }
  return (
    <div className={`sticky ${styles.toolbar}`}>
      <section className={styles.formatPanel}>
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
      </section>
      <section className={styles.formatPanel}>
        <button
          title='Абзац кода'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editorState.isCodeBlock ? `${styles.isActive}` : ''} ${variants.primary}`}
        >
          <code className={`${styles.codeBlock}`}>АБЗАЦ КОДА</code>
        </button>
        <button
          title='Цитата'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editorState.isBlockquote ? `${styles.isActive}` : ''} ${variants.primary}`}
        >
          <blockquote className={`${styles.blockquoteFormat}`}>ЦИТАТА</blockquote>
        </button>
      </section>
      <section className={styles.formatPanel}>
        <button
          title='Маркированный список'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editorState.isBulletList ? `${styles.isActive}` : ''} ${variants.primary}`}
        >
          <ul className={styles.ulFormat}>
            <li>&bull; ...</li>
            <li>&bull; ...</li>
          </ul>
        </button>
        <button
          title='Нумерованный список'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editorState.isOrderedList ? `${styles.isActive}` : ''} ${variants.primary}`}
        >
          <ol className={styles.ulFormat}>
            <li>1 ...</li>
            <li>2 ...</li>
          </ol>
        </button>
      </section>
      <section className={styles.formatPanel}>
        <button
          title='Жирный'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={`${editorState.isBold ? `${styles.isActive}` : ''} ${variants.primary}`}
          >
          <strong>Ж</strong>
        </button>
        <button
          title='Курсив'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={`${editorState.isItalic ? `${styles.isActive}` : ''} ${variants.primary}`}
          >
          <i>К</i>
        </button>
        <button
          title='Зачеркнутый'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={`${editorState.isStrike ? `${styles.isActive}` : ''} ${variants.primary}`}
          >
          <s>З</s>
        </button>
        <button
          title='Код'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={`${editorState.isCode ? `${styles.isActive}` : ''} ${variants.primary}`}
          >
          <code className={styles.codeBlock}>КОД</code>
        </button>
      </section>
      <section className={styles.formatPanel}>
        <button 
          title='Отменить изменение'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className={variants.primary}>
          ↶
        </button>
        <button 
          title='Вернуть изменение'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className={variants.primary}>
          ↷
        </button>
        {/* <button className={variants.primary} onClick={addImage}>Set image</button> */}
      </section>
    </div>
  )
}

export default TipTapEditorToolbar
