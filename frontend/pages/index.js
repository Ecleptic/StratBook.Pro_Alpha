import Link from 'next/link'
import Signup from '../components/Signup_Portal'
// import Trix from '../components/Trix'
import DraftEditor from '../components/Draft'

export default () => (
    <div>
        <h2>Welcome to StratBook.pro 🔥</h2>
        <h3>What game do you want to play?</h3>
        {/* <Signup /> */}
        {/* <Trix /> */}
        <ul>
            <li>
                <Link href="overwatch">
                    <a>Overwatch</a>
                </Link>
            </li>
        </ul>
    </div>
)
