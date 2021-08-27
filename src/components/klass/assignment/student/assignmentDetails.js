import { useSetRecoilState } from 'recoil';
import { assignmentStudentDrawerId } from '../../../../atoms';

const AssignmentDetails = () => {
    const setIndex = useSetRecoilState(assignmentStudentDrawerId);
    return ( 
        <div>
            <button onClick={()=>setIndex(0)}>Go back to assigned assignment list</button>
            <h1>Assignment Details</h1>
        </div>
     );
}
 
export default AssignmentDetails;