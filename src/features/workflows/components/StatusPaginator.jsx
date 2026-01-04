import ClickableSpan from "@/components/ui/Label/ClickableSpan";
import { useWorkflowState } from "@/lib/providers/WorkflowProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

function StatusPaginator(
    {
        handleChange = () => null
    }
) {
    const { searchParams, handleSearchParams } = useWorkflowState();
    const navigate = useNavigate();
    
    const STATUSES = {
        '': 'Все',
        backlog: 'В бэклоге',
        ready: 'Готово к работе',
        in_progress: 'В работе',
        review: 'На проверке',
        done: 'Выполнено',
        cancelled: 'Отменено',
        deleted: 'Удалено',
    }
    
    const addParamWithNavigate = (key, value) => {
        const params = new URLSearchParams(searchParams);
        console.log(params.get('status'))
        params.set(key, value);
        console.log(params)
        handleSearchParams(params)
        navigate(`?${params.toString()}`, { replace: true });
        handleChange(params);
    };

    return (
        <div className="flex flex-row flex-wrap mx-3 items-center justify-center gap-x-3">
            <ClickableSpan variant='secondary' key="all"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', '')}>
                    Все
            </ClickableSpan>
            <ClickableSpan variant='secondary' key="backlog"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', 'backlog')}>
                    В бэклоге
            </ClickableSpan>
            <ClickableSpan variant='secondary' key="ready"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', 'ready')}>
                    Готово к работе
            </ClickableSpan>
            <ClickableSpan variant='secondary' key="in_progress"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', 'in_progress')}>
                    В работе
            </ClickableSpan>
            <ClickableSpan variant='secondary' key="review"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', 'review')}>
                    На проверке
            </ClickableSpan>
            <ClickableSpan variant='secondary' key="done"
                currentValue={STATUSES[searchParams.get('status')]}
                onClick={() => addParamWithNavigate('status', 'done')}>
                    Выполнено
            </ClickableSpan>
        </div>
    )
}

export default StatusPaginator
