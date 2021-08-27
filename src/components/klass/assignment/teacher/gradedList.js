import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const GradedList = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div>
            <h1>Graded List</h1>
            <button onClick={()=>setIndex(5)}>go to specific graded details</button>
        </div>
     );
}
 
export default GradedList;