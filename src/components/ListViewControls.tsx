interface Props {
    onGoBack: (arg: any) => void
    onGoForward: (arg: any) => void
    isGoBackDisabled: boolean
    isGoForwardDisabled: boolean
}

const ListViewControls = ({ onGoBack, onGoForward, isGoBackDisabled, isGoForwardDisabled }: Props) => {
    return (
        <div className="flex justify-between text-white text-xl font-bold my-4">
            <button
                className={`px-2 pb-1 border border-white rounded ${isGoBackDisabled ? 'bg-slate-600' : 'bg-teal-600'}`}
                disabled={isGoBackDisabled}
                onClick={onGoBack}
            >
                &#60;
                </button>
            <button
                className={`px-2 pb-1 border border-white rounded ${isGoForwardDisabled ? 'bg-slate-600' : 'bg-teal-600'}`}
                disabled={isGoForwardDisabled}
                onClick={onGoForward}
            >
                &#62;
            </button>
        </div>
    )
}

export default ListViewControls