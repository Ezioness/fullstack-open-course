const PersonDetails = (props) => {
    return (
        <div>
            {props.name} {props.number}
        </div>
    )
}

const Persons = (props) => {
    return (
        <div>
            {
                props.persons.map(person =>
                    <PersonDetails key={person.name} name={person.name} number={person.number}/>
                )
            }
        </div>
    )
}

export default Persons