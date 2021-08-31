import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const AssignmentList = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div style={{paddingTop:"24px", paddingLeft:"24px"}}>
            <h1>Created assignment List</h1>
            <button onClick={()=>setIndex(1)}>Go to specific assignment page</button>
        </div>
     );
}
 
export default AssignmentList;