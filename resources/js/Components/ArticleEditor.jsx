import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import MediaLibraryModal from './MediaLibraryModal';

export default function ArticleEditor({ content, onChange, placeholder = 'Mulai tulis artikel berita di sini...' }) {
    const [mediaModalOpen, setMediaModalOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#843799] underline font-semibold hover:text-[#60396A]',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full my-6 shadow-md border border-gray-100 object-cover mx-auto',
                },
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[350px] p-5 text-gray-800 text-sm leading-relaxed',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Masukkan URL Link:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const handleSelectMediaImage = (mediaItem) => {
        if (mediaItem?.url) {
            editor.chain().focus().setImage({ src: mediaItem.url, alt: mediaItem.filename }).run();
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm focus-within:border-[#843799] focus-within:ring-2 focus-within:ring-[#FAE6FF] transition-all">
            {/* Toolbar */}
            <div className="bg-gray-50/80 border-b border-gray-200 p-2 flex flex-wrap items-center gap-1">
                {/* Heading 2 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        editor.isActive('heading', { level: 2 })
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Heading 2"
                >
                    H2
                </button>

                {/* Heading 3 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        editor.isActive('heading', { level: 3 })
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Heading 3"
                >
                    H3
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1" />

                {/* Bold */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                        editor.isActive('bold')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Bold (Ctrl+B)"
                >
                    <strong>B</strong>
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`w-8 h-8 rounded-lg text-xs italic flex items-center justify-center transition-colors ${
                        editor.isActive('italic')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Italic (Ctrl+I)"
                >
                    <em>I</em>
                </button>

                {/* Underline */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`w-8 h-8 rounded-lg text-xs underline flex items-center justify-center transition-colors ${
                        editor.isActive('underline')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Underline (Ctrl+U)"
                >
                    <u>U</u>
                </button>

                {/* Strike */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`w-8 h-8 rounded-lg text-xs line-through flex items-center justify-center transition-colors ${
                        editor.isActive('strike')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Strikethrough"
                >
                    S
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1" />

                {/* Bullet List */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors ${
                        editor.isActive('bulletList')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Bullet List"
                >
                    •≡
                </button>

                {/* Ordered List */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors ${
                        editor.isActive('orderedList')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Numbered List"
                >
                    1.≡
                </button>

                {/* Blockquote */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`w-8 h-8 rounded-lg text-xs font-serif flex items-center justify-center transition-colors ${
                        editor.isActive('blockquote')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Kutipan (Blockquote)"
                >
                    “ ”
                </button>

                {/* Horizontal Rule */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-2.5 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-200/70 transition-colors"
                    title="Garis Pemisah (Horizontal Rule)"
                >
                    ──
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1" />

                {/* Link */}
                <button
                    type="button"
                    onClick={setLink}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        editor.isActive('link')
                            ? 'bg-[#843799] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200/70'
                    }`}
                    title="Sisipkan / Edit Link"
                >
                    🔗 Link
                </button>

                {/* Media Image Button */}
                <button
                    type="button"
                    onClick={() => setMediaModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-[#FAE6FF] text-[#843799] hover:bg-[#F4C6FF] transition-all shadow-sm"
                    title="Sisipkan Gambar dari Media Library"
                >
                    🖼️ Sisipkan Gambar
                </button>

                <div className="flex-1" />

                {/* Undo / Redo */}
                <button
                    type="button"
                    disabled={!editor.can().undo()}
                    onClick={() => editor.chain().focus().undo().run()}
                    className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-gray-600 hover:bg-gray-200/70 disabled:opacity-30"
                    title="Undo (Ctrl+Z)"
                >
                    ↩️
                </button>
                <button
                    type="button"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                    className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-gray-600 hover:bg-gray-200/70 disabled:opacity-30"
                    title="Redo (Ctrl+Y)"
                >
                    ↪️
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white min-h-[350px]">
                <EditorContent editor={editor} />
            </div>

            {/* Media Library Modal */}
            <MediaLibraryModal
                isOpen={mediaModalOpen}
                onClose={() => setMediaModalOpen(false)}
                onSelectImage={handleSelectMediaImage}
                title="Pilih Gambar untuk Konten Artikel"
            />
        </div>
    );
}
