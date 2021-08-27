import { useSetRecoilState } from 'recoil';
import { assignmentStudentDrawerId } from '../../../../atoms';

const Grade = () => {
    const setIndex = useSetRecoilState(assignmentStudentDrawerId);
    return ( 
        <div>
            <button onClick={()=>setIndex(1)}>Go back to complated assign list</button>
            <h1>Grade</h1>
        </div>
     );
}
 
export default Grade;