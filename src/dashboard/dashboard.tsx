import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 등록 (한 번만 하면 됩니다)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FinalChartComponent() {
    // 1. 초기 데이터는 반드시 null 또는 undefined로 설정
    console.log('컴포넌트 렌더링...');
    const [chartData, setChartData] = useState(null);

    // API 호출을 흉내 내는 useEffect
    useEffect(() => {
        console.log('컴포넌트 마운트, 데이터 로딩 시작...');

        const fetchData = () => {
            // 2. 1.5초 후에 데이터가 들어왔다고 가정
            setTimeout(() => {
                console.log('데이터 로딩 완료!');
                const apiResponse = {
                    labels: ['1팀', '2팀', '3팀', '4팀', '5팀', '6팀'],
                    datasets: [
                        {
                            label: '분기별 실적',
                            data: [82, 77, 95, 64, 89],
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };
                // setChartData(apiResponse); // 3. 데이터가 준비되면 state 업데이트
            }, 1500);
        };

        fetchData();
    }, []); // []를 비워두어 처음 한 번만 실행되게 함

    // 4. 차트 옵션 (애니메이션 포함)
    const options = {
        responsive: true,
        animation: {
            duration: 1500,
            easing: 'easeInOutCubic',
        },
        plugins: {
            title: { display: true, text: '데이터 로딩 후 애니메이션' },
        },
        scales: { y: { beginAtZero: true } },
    };

    // 5. 데이터가 준비되지 않았으면 로딩 화면을, 준비되었으면 차트를 보여줌
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            {/* chartData가 null이면 왼쪽(로딩)을, 값이 있으면 오른쪽(차트)을 렌더링 
        이것이 애니메이션을 보장하는 핵심입니다.
      */}
            {/* {!chartData ? <div>차트 데이터를 불러오는 중입니다...</div> : <Bar options={options} data={chartData} />} */}
        </div>
    );
}
// 대시보드 주석처리
