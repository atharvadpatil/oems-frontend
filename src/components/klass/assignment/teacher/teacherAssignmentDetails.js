import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const TeacherAssignmentDetails = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div>
            <h1>Assignment Details</h1>
            <button onClick={()=>setIndex(0)}>Go back to assignemnt list</button>
        </div>
     );
}
 
export default TeacherAssignmentDetails;