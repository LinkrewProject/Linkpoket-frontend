import Modal from '@/components/common-ui/Modal';

const privacyData = [
  {
    title: '제1조(목적)',
    content: (
      <p>
        <strong>Linkrew</strong>(이하 '서비스'라 함)는 이용자가 링크를 손쉽게
        저장·관리·공유할 수 있도록 지원하는 비상업적 서비스입니다. 본 약관은
        Linkrew 서비스 이용과 관련하여 이용자와 Linkrew 간의 권리·의무 및
        책임사항을 규정하는 것을 목적으로 합니다.
      </p>
    ),
  },
  {
    title: '제2조(개인정보 수집에 대한 동의 및 수집 방법)',
    content: (
      <ol className="ml-5 list-decimal space-y-2">
        <li>
          서비스는 이용자가 서비스 이용약관 및 개인정보 처리방침에 동의하는
          경우, 개인정보 수집 및 이용에 동의한 것으로 봅니다.
        </li>
        <li>
          서비스는 다음과 같은 방법으로 개인정보를 수집합니다.
          <ul className="ml-5 list-disc">
            <li>회원가입 및 서비스 이용 과정에서 이용자가 입력하는 정보</li>
            <li>고객센터 문의를 통한 정보 수집</li>
            <li>
              서비스 이용 과정에서 자동으로 생성 및 수집되는 정보(쿠키, 접속
              기록 등)
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  {
    title: '제3조(개인정보 수집 및 이용 목적)',
    content: (
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">구분</th>
            <th className="border px-2 py-1">수집목적</th>
            <th className="border px-2 py-1">수집항목</th>
            <th className="border px-2 py-1">보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">회원가입 및 관리</td>
            <td className="border px-2 py-1">
              회원 식별 및 본인확인, 서비스 제공, 문의 대응
            </td>
            <td className="border px-2 py-1">
              이메일 주소, 닉네임, 연령대, 성별, 직업
            </td>
            <td className="border px-2 py-1">회원 탈퇴 시까지</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">맞춤형 광고 제공</td>
            <td className="border px-2 py-1">이용자의 관심에 맞는 광고 제공</td>
            <td className="border px-2 py-1">
              서비스 이용기록, 접속 로그, 쿠키 정보
            </td>
            <td className="border px-2 py-1">
              수집일로부터 1년 또는 탈퇴 시까지
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: '제4조(개인정보 자동 수집 장치 설치 및 운영)',
    content: (
      <div className="space-y-2">
        <p>
          회사는 서비스 이용과정에서 이용자로부터 다음과 같은 정보들이 자동으로
          생성·수집되고 다음의 목적으로 이용될 수 있습니다.
        </p>
        <ul className="ml-5 list-disc">
          <li>관련법규 준수를 위해 접속기록(로그인)을 보관합니다.</li>
          <li>
            쿠키 거부 방법: 사용 중인 웹브라우저 또는 앱 설정에서 쿠키 저장을
            거부하거나 삭제할 수 있습니다.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: '제5조(개인정보의 제3자 제공)',
    content: (
      <p>
        서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만,
        다음의 경우에는 예외적으로 개인정보를 제공할 수 있습니다.
        <br />① 이용자가 사전에 동의한 경우
        <br />② 법령에 의해 요구되는 경우
        <br />※ 현재 Linkrew는 제3자 제공을 하지 않으며, 추후 제공이 필요한 경우
        별도로 이용자의 동의를 얻을 예정입니다.
      </p>
    ),
  },
  {
    title: '제6조(개인정보 보유 및 이용기간)',
    content: (
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">보존목적</th>
            <th className="border px-2 py-1">근거법령</th>
            <th className="border px-2 py-1">보존기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">웹사이트 접속 기록 보존</td>
            <td className="border px-2 py-1">통신비밀보호법</td>
            <td className="border px-2 py-1">3개월</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: '제7조(이용자 및 법정대리인의 권리와 행사 방법)',
    content: (
      <p>
        이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를
        요구할 수 있으며, 법정대리인은 만 14세 미만 이용자의 개인정보에 대해
        동일한 권리를 행사할 수 있습니다. ※ 요청은 서비스 내 설정 메뉴 또는
        고객센터를 통해 가능합니다.
      </p>
    ),
  },
  {
    title: '제8조(개인정보 보호를 위한 기술적∙관리적 대책)',
    content: (
      <ul className="ml-5 list-disc">
        <li>개인정보 취급 직원의 최소화 및 교육</li>
        <li>내부관리계획 수립 및 시행</li>
        <li>접속기록 보관 및 위변조 방지</li>
        <li>개인정보의 암호화</li>
        <li>해킹 대비 보안 시스템 운영</li>
        <li>개인정보에 대한 접근통제 제한</li>
      </ul>
    ),
  },
  {
    title: '제9조(개인정보 보호책임자 및 문의처)',
    content: (
      <ul className="ml-5 list-disc">
        <li>개인정보 보호책임자: 박지현</li>
        <li>이메일: blackhole124594@naver.com</li>
      </ul>
    ),
  },
  {
    title: '제10조(권익침해에 대한 구제방법)',
    content: (
      <ul className="ml-5 list-disc">
        <li>개인정보 침해신고센터: privacy.kisa.or.kr / 118</li>
        <li>개인정보 분쟁조정위원회: www.kopico.go.kr / 1833-6972</li>
        <li>대검찰청 사이버범죄수사단: www.spo.go.kr / 02-3480-3573</li>
        <li>경찰청 사이버안전국: cyberbureau.police.go.kr / 182</li>
      </ul>
    ),
  },
  {
    title: '제11조(개인정보 처리방침 변경)',
    content: (
      <p>
        본 개인정보 처리방침은 2025년 6월 1일부터 적용됩니다. 법령이나 서비스
        정책 변경 시, 사전에 공지 후 변경사항을 적용합니다.
      </p>
    ),
  },
];

export const PrivacyModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <p className="text-lg font-bold">개인정보 처리방침</p>
      </Modal.Header>
      <Modal.Body className="max-h-[70vh] space-y-4 overflow-y-auto text-sm text-gray-700">
        {privacyData.map(({ title, content }, idx) => (
          <section key={idx}>
            <h2 className="mb-1 text-base font-semibold">{title}</h2>
            {content}
          </section>
        ))}
        <p className="mt-8 text-xs text-gray-500">
          본 방침은 2025년 6월 1일부터 적용됩니다.
        </p>
      </Modal.Body>
    </Modal>
  );
};
