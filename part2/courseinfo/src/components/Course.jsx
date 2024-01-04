const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const initialValue = 0
  const totalExercises = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  )
  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} part={part} />
      }
      )}
      <Total sum={totalExercises} />
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
        </div>
      )}
    </>
  )
}

export default Course