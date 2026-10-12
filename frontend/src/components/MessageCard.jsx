import { api } from "../api/api"
import { useMessageStore } from "../store/useMessageStore"
import { useUserStore } from "../store/useUserStore"

const MessageCard = ({ id, userId, likes, likedBy, content, username, createdAt }) => {
    const { session } = useUserStore()
    const { getMessages } = useMessageStore()
    const handleDelete = async () => {
        await api.deleteMessage(id)
        await getMessages()
    }
    const handleLike = async () => {
        await api.likeMessage(id)
        await getMessages()
    }
    const handleReport = async () => {
        await api.reportMessage(id)
        await getMessages()
    }
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                {
                    session?.user && (
                        <>
                            <button className="action-button" onClick={handleLike}>
                                <span>{likes} {likedBy.includes(session.user.id) ? "💗" : "🤍"}</span>
                                <span>Нравится</span>
                            </button>
                            <button className="action-button" onClick={handleReport}>
                                <span>🚩</span>
                                <span>Пожаловаться</span>
                            </button>
                        </>
                    )}
                {
                    userId === session?.user.id && (<button className="action-button delete" onClick={handleDelete}>
                        <span>❌</span>
                        <span>Удалить</span>
                    </button>
                    )}
            </div>
        </div>
    )
}

export default MessageCard
