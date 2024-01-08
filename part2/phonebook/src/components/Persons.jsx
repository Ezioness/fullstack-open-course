const PersonDetails = (props) => {    
    return (
        <div>
            {props.name} {props.number}
            <button onClick={props.deletePerson}>X</button>
        </div>
    )
}

const Persons = (props) => {
    return (
        <div>
            {
                props.persons.map(person =>
                    <PersonDetails key={person.name} name={person.name} number={person.number} deletePerson={() => props.deletePerson(person.id)} />
                )
            }
        </div>
    )
}

export default Persons