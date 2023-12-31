window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화



function getDayAndTime(){
    const profileNumber = sessionStorage.getItem('profileNumber');

    $.ajax({
        url: `/counselor/bookingDayAndTime`,
        type: 'GET',
        data: {profileNumber : profileNumber},
        success: function (profileDto) {

            let list = profileDto.profileDay;
            console.log(profileDto)
            console.log(list);
            setDisabled(list);
            setTimeDisabled(profileDto.profileTime);
        },
    });
}

function setTimeDisabled(list){
    let arList = list.split(', ');

    arList.forEach( time => {

        $('.btn-time').each((i, ele) => {
            if($(ele).val() == time){
                $(ele).attr('disabled', false);
            }
        })

    });
}

function setDisabled(list){
    let dayList = ['day0','day1','day2','day3','day4','day5','day6'];
    list = list.split(', ');

    for(let i=0; i<list.length; i++){
        let idx = dayList.indexOf(list[i]);
        dayList.splice(idx, 1);
    }

    dayList.forEach(ele => {
        $('.futureDay').each((i,day) => {
            if($(day).hasClass(ele)){
                $(day).addClass('pastDay');
                $(day).removeClass('futureDay');
            }
        });

        if($('.today').hasClass(ele)){
            $('.today').addClass('pastDay');
            $('.today').removeClass('today');
        }

    });
}


// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고


        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }



        if (nowDay < today) {                       // 지난날인 경우
            newDIV.className = "pastDay";
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }

        newDIV.className += ' day' + nowDay.getDay();
    }

    getDayAndTime();

}

// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}
/*======달력 종료======*/

/*======시간 설정======*/
// const buttons = document.querySelectorAll('.btn-time');
// let selectedTime = null;

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         if (!selectedTime) {
//             selectedTime = button.getAttribute('data-time');
//             button.disabled = true;
//             alert(`${selectedTime}를 선택하셨습니다.`);
//         } else {
//             alert('이미 시간을 선택하셨습니다.');
//         }
//     });
// });
/*======시간 설정 종료======*/

// 날짜를 클릭했을 때 선택 처리를 추가
let dateCells = document.querySelectorAll('.Calendar td:not(.pastDay)');
dateCells.forEach(dateCell => {
    dateCell.addEventListener('click', () => {
        if (dateCell.classList.contains('selected')) {
            dateCell.classList.remove('selected');
        } else {
            dateCell.classList.add('selected');
        }
    });
});

// 시간 버튼에 이벤트 핸들러 할당
const timeButtons = document.querySelectorAll('.btn-time');
timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        choiceTime(button);
    });
});

// 시간 선택 함수
    function choiceTime(button) {
        // 이미 선택한 시간인지 확인
        const isSelected = button.classList.contains('selected');

        // 모든 시간 버튼에서 'selected' 클래스 제거
        timeButtons.forEach(button => {
            button.classList.remove('selected');
        });

        // 선택한 시간이 아닌 경우에만 'selected' 클래스 추가
        if (!isSelected) {
            button.classList.add('selected');
            // 선택한 시간에 대한 처리 추가
            alert(`${button.getAttribute('data-time')}를 선택하셨습니다.`);
        }
    }


// "다음 단계" 링크 클릭 시 선택 여부 확인
document.querySelector('.nextpage').addEventListener('click', function (event) {
    const selectedDate = document.querySelector('.Calendar p.choiceDay');
    const selectedTime = document.querySelector('.selected');

    if (!selectedDate || !selectedTime) {
        alert('날짜와 시간을 선택해야 다음 페이지로 진행할 수 있습니다.');
        event.preventDefault(); // 링크의 기본 동작(페이지 이동)을 막음
    }
});

// "다음 단계" 링크 클릭 시 이벤트 핸들러
document.querySelector('.btn-nextpage a').addEventListener('click', function (event) {
    event.preventDefault();  // 기본 동작(링크 이동) 막기

    // 다음 단계로 이동
    window.location.href = this.getAttribute('href');
});

// 날짜를 클릭했을 때 선택 처리 및 비활성화 처리 추가
function choiceDate(newDIV) {
    if (document.querySelector('.choiceDay')) {
        document.querySelector('.choiceDay').classList.remove('choiceDay');
    }

    if (!newDIV.classList.contains('disabled')) {
        newDIV.classList.add('choiceDay');
        disableOtherDates(newDIV);
    }
}

function disableOtherDates(selectedDate) {
    const dateCells = document.querySelectorAll('.Calendar td:not(.pastDay)');
    dateCells.forEach(dateCell => {
        if (dateCell !== selectedDate && !dateCell.classList.contains('disabled')) {
            dateCell.classList.add('disabled');
        }
    });
}

// function choiceDate(newDIV) {
//     if (document.querySelector('.choiceDay')) {
//         document.querySelector('.choiceDay').classList.remove('choiceDay');
//     }
//
//     if (!newDIV.classList.contains('disabled')) {
//         newDIV.classList.add('choiceDay');
//         const year = document.getElementById('calYear').innerText;
//         const month = document.getElementById('calMonth').innerText;
//         const day = newDIV.innerText;
//         const bookDate = `${year}-${month}-${day}`;
//         console.log('Selected date:', bookDate);
//     }
// }

function choiceDateAndTime() {
    const selectedDate = document.querySelector('.choiceDay');
    const selectedTime = document.querySelector('.btn-time.selected');

    if (selectedDate && selectedTime) {
        const year = document.getElementById('calYear').innerText;
        const month = document.getElementById('calMonth').innerText;
        const day = selectedDate.innerText;
        const bookDate = `${year}-${month}-${day}`;
        const bookTime = selectedTime.getAttribute('data-time');

        // 데이터를 sessionStorage에 저장
        // bookingDetails 페이지에서 userCNumber 가져오기
        let userCNumber = sessionStorage.getItem('userCNumber');

        // userCNumber를 사용하여 필요한 작업 수행
        console.log('userCNumber:', userCNumber);
        sessionStorage.setItem('bookDate', bookDate);
        sessionStorage.setItem('bookTime', bookTime);

        // 다음 페이지로 이동
        window.location.href = '/counselor/bookingDetails02';
    } else {
        alert('날짜와 시간을 선택해주세요.');
    }
}


