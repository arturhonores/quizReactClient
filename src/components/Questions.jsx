import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**Custom Hook */
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

const Questions = ({ onChecked }) => {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({ trace, checked }))
    }, [checked])

    const onSelect = (i) => {
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked }))
    }

    if (isLoading) return <h3>isLoading</h3>
    if (serverError) return <h3>{serverError || "Unknown Error"}</h3>

    return (
        <div>
            <h2 className="py-4 text-lg">{questions?.question}</h2>
            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i} className="py-2">
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                // checked={result[trace] === i}
                                className={`peer/option check relative ${result[trace] === i && "before:absolute before:w-3 before:h-3 before:bg-transparent before:rounded-full before:border-yellow-500 before:border-4 before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2"}`}
                            />
                            <label htmlFor={`q${i}-option`} className={`peer-checked/option:text-yellow-500 ml-3 ${result[trace] === i && "text-yellow-500"}`}>{q}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default Questions