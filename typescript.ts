// 타입 주석
let a: number = 1;
let c: boolean = false;
let d: string = 'TypeScript';
let f = { a: 1 };
f.a = 2;
// f.b = 3; => 오류 발생
let h: number[] = [];

// 특정 값을 타입으로 사용 가능, 이 경우에는 값이 타입으로 사용한 값으로 한정됨
let i: 'good' = 'good';

// 어떤 값이든 가능한 any, 남발하지 않는 것이 좋다.
let g: any = 3;
g = '1';
g = 3;
g= false;

// 함수의 매개변수와 리턴 값에도 타입을 지정해줄 수 있다.
function add(a: number, b: number): number {
    return a + b;
};

// 타입 추론
let b = 2;
// b = 'a'; => 오류 발생

// 인터페이스
// 속성 뒤에 ?를 붙이면 선택 속성으로서 undefined 속성으로 취급할 수 있다.
// 이를 Optional이라 부른다.
interface Company {
    name: string;
    age: number;
    address?: string;
}

const naver: Company = {
    name: 'Naver',
    age: 20,
    // address: 'Seoul' => 생략 가능
}

// 익명 인터페이스
const person: {
    name: string,
    age?: number
} = {
    name: '박영규',
    age: 26
}

// tuple
// 리스트에 들어갈 수 있는 값을 제한하여 튜플을 흉내낼 수 있다.
const tuple: [string, number] = ['박영규', 26];

// enum
// 코드 가독성이 좋아진다.
// 값을 지정해주어 커스터마이징을 할 수도 있다.
enum Color {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue'
};

const color = Color.BLUE;
if(color === Color.BLUE) {
    // 코드
}

// 대수 타입 중 합집합 타입
let numOrStr: number | string = 1;
numOrStr = 'str';

// 대수 타입 중 교집합 타입
// let numAndStr: number & string = ''; => 불가능, 즉 원시 타입에서는 사용할 수는 없다.
// 인터페이스에서 주로 활용된다.
interface Name {
    name: string
}
interface Age {
    age: number;
}

let gue: Name & Age = {
    name: '박영규',
    age: 26
};

// 인터페이스에서 합집합 타입을 사용하면 optional로 사용이 가능하다.
let gue2: Name | Age = {
    name: '박영규'
};

// 대수 타입과 type 키워드를 통해 타입을 만들어낼 수도 있다.
type Person = Name & Age;
let sue: Person = {
    name: 'sue',
    age: 20
}

// optional을 인터페이스에서 응용하기
interface Post {
    title: string;
    content: string;
}

interface ResponseData {
    post?: Post;
    message?: string;
    status: number;
}

const response: ResponseData[] = [
    {
        post: {
            title: 'Hi!',
            content: 'Hello!!!'
        },
        status: 200
    },
    {
        message: 'Error!',
        status: 500
    }
];

console.log(response[1].post && response[1].post.title); // optional 이전의 방식
console.log(response[0].post?.title); // 데이터가 없다면 자동으로 undefined를 반환한다.
console.log(response[0].post!.title); // 반대로 무조건 값이 있어야한다고 설정할 수도 있다.

// Generic
// 꺽쇠 안에 타입을 넣어 지정해줄 수 있다.
interface Value<T> {
    value: T;
}

const value: Value<number> = {
    value: 1
}

// 함수에도 사용할 수 있다.
function toString<T>(a: T): string {
    return `${a}`;
}

interface User {
    id: number;
    name: string;
    age: number;
    address: string;
    createdAt?: string;
    updatedAt?: string;
}

// Partial: 모든 필드가 Optional이 된다.
const partial: Partial<User> = {}

// Reqired: 모든 필드가 Required가 된다.
const required: Required<User> = {
    id: 1,
    name: 'Lee',
    age: 0,
    address: 'Seoul',
    createdAt: 'string',
    updatedAt: 'string',
}

// Pick: 특정 필드만 골라서 사용할 수 있다.
const pick: Pick<User, 'name' | 'age'> = {
    name: 'gue',
    age: 26
} 

// Omit: 특정 필드만 빼고 사용할 수 있다.
const omit: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
    name: '',
    age: 0,
    address: ''
}

// 혼합해서 응용할 수 있다.
const mixed: Omit<User, 'id' | 'address' | 'age' | 'createdAt' | 'updatedAt'> & Pick<Partial<User>, 'address' | 'age'> = {
    name: '',
}

// extends
// 인터페이스 상속 개념 예시
interface Time {
    hour: number;
    minute: number;
    second: number;
}

interface DateTime extends Time {
    year: number;
    month: number;
    day: number;
}

interface OffsetDateTime extends DateTime {
    offset: number;
}

interface TimeFormat extends Pick<Time, 'hour' | 'minute'> {
    ampm: 'am' | 'pm';
}

const timeFormat: TimeFormat = {
    hour: 10,
    minute: 30,
    ampm: 'am'
}