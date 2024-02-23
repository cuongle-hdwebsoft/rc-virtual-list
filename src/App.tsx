import './App.css'
import RcVirtualList from './components/RcVirtualList'
import { faker } from '@faker-js/faker'

function App() {
  const list = Array.from({ length: 100000 }, (_, index) => ({
    id: index,
    name: faker.person.fullName(),
  }));

  return (
    <>
      <div className="inner-container">
        <RcVirtualList 
          list={list}
          itemHeight={50}
          render={(item) => (
            <span>{item.id} - {item.name}</span>
          )}
        />
      </div>
    </>
  )
}

export default App
