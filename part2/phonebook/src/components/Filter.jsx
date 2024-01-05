const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.nameSearch} onChange={props.handleSearchChange} />
        </div>
    )
}

export default Filter