import './DateComponent.css'

interface DateConstructor {
    id: number;
    date: string;
}

export const DateComponent = (props: DateConstructor) => {
    return (
        <div
            data-testid={'DateComponent-'+props.id}
            className='DateComponent'
        >
            {props.date}
        </div>
    )
}