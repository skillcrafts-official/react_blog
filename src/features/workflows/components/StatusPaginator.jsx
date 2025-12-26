import ClickableSpan from "@/components/ui/Label/ClickableSpan";

function StatusPaginator(
    { handleChange = () => null }
) {
    // console.log(typeof handleChange)
    return (
        <div className="flex flex-row flex-wrap mx-3 items-center justify-center gap-x-3">
            <ClickableSpan variant='secondary' key="all" onClick={() => handleChange('')}>Все</ClickableSpan>
            <ClickableSpan variant='secondary' key="backlog" onClick={() => handleChange('backlog')}>В очереди</ClickableSpan>
            <ClickableSpan variant='secondary' key="ready" onClick={() => handleChange('ready')}>Готово к работе</ClickableSpan>
            <ClickableSpan variant='secondary-invert' key="inProgress" onClick={() => handleChange('in_progress')}>В работе</ClickableSpan>
            <ClickableSpan variant='secondary' key="review" onClick={() => handleChange('review')}>На проверке</ClickableSpan>
            <ClickableSpan variant='secondary' key="done" onClick={() => handleChange('done')}>Выполнено</ClickableSpan>
        </div>
    )
}

export default StatusPaginator
