import { SkillTag } from '../shared/ui/skillTag/skillTag';

const App = () => (
  <>
    <SkillTag name='английский язык' category='language' />
    <SkillTag name='Игра на барабанах' category='education' />
    <SkillTag name='3' category='other' isCountExtra />
  </>
);

export default App;
