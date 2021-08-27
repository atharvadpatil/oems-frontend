import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const ResponsesList = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div>
            <h1>Responses List</h1>
            <button onClick={()=>setIndex(3)}>Go to specific response</button>
        </div>
    );
}
 
export default ResponsesList;