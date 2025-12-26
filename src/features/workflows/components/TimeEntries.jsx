import ClickableSpan from "@/components/ui/Label/ClickableSpan"
import { API_BASE_URL, API_DATA } from "@/constants";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useCallback, useEffect, useState } from "react"
import Span from "@/components/ui/Label/Span";

function TimeEntries({ task }) {
    const { userId } = useGlobalState();
    const [hours, setHours] = useState(1);
    const [allHours, setAllHoursSpent] = useState(task?.all_spents);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTimeEntries = async (hoursSpent) => {
        if (!task || !userId) {
            return;
        }
        setIsUpdating(true);
        setError(null);

        try {
            const payload = {
                hours_spent: parseInt(hoursSpent),
                "task": parseInt(task.id),
                user: parseInt(userId)
            }
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TIME_ENTRIES.GET_OR_POST(task.id)
                }`, API_DATA("POST", payload)
            );
            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }
            const data = await response.json();
            setAllHoursSpent(data?.all_spents);
            return data;
        } catch (error) {
            console.log('Failed to update hours spent with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }

    // if (task, userId) {
    //     const payload = {
    //         hours_spent: parseInt(hoursSpent),
    //         "task": parseInt(task.id),
    //         user: parseInt(userId)
    //     }
    //     console.log(payload)
    //     updateTimeEntries(payload);
    // }

    return (
        <div className="flex flex-row flex-wrap gap-x-3 items-center justify-center">
            <ClickableSpan variant='tertiary-invert'
                onClick={() => setHours(prev => prev > 1 ? prev - 1: prev)}
                >
                    {"-1ч"}</ClickableSpan>
            <ClickableSpan variant='tertiary-invert'
                onClick={() => updateTimeEntries(hours)}
                >
                    Списать {hours}ч</ClickableSpan>
            <ClickableSpan variant='tertiary-invert'
                onClick={() => setHours(prev => prev < 24 ? prev + 1: prev)}
                >
                    {"+1ч"}</ClickableSpan>
            <Span variant="secondary">{
                allHours ? `Уже списано ${allHours}ч` : 'Списаний пока нет...'
            }</Span>
        </div>
    )
}

export default TimeEntries
