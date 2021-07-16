import { BusinessCenter, Person } from "@material-ui/icons";
import Link from "next/link";

export default function PaymentTabs({type}: {type: string}) {
    return (
        <div className="flex gap-4 text-lg text-gray-400 border-b border-gray-200 select-none">
            <TabSection status="personal" type={type} title="For Individual Use" icon={<Person />} />
            <TabSection status="comercial" type={type} title="For Organizations" icon={<BusinessCenter />} />
        </div>
    )
}

type TabSectionProps = { status: string, title: string, icon: any, type: string }
function TabSection({ status, title, icon, type }: TabSectionProps) {
    return (
        <Link href={`/payment/checkout/${status}`}>
            <a className={`p-1 border-blue-500 cursor-pointer ${type === status ? "text-blue-500 border-b-2" : ""}`}>
                {icon} {title}
            </a>
        </Link>
    )
}


