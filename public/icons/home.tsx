export default function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M22 9.15789L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 9.15789L12 2"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 19V7.36841"    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 19V7.36841"   stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5 19H19"         stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}
