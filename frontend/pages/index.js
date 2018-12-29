import Link from 'next/link'
import Signup from '../components/Signup_Portal'

export default () => (
    <div>
        <h2>welcome to stratbook.pro 🔥</h2>
        <h3>What game do you want to play?</h3>
        {/* <Signup /> */}
        <ul>
            <li>
                <Link href="Overwatch">
                    <a>Overwatch</a>
                </Link>
            </li>
        </ul>
    </div>
)
