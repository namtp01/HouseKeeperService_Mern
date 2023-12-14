import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    { question: '1. Tôi cần làm gì để đăng một công việc cần người giúp việc?', 
        answer: 'Trả lời: Để đăng công việc, bạn chỉ cần tạo tài khoản, sau đó chọn "Đăng công việc" và điền thông tin chi tiết về công việc cần người giúp việc.' },
    {
        question: '2. Làm thế nào để tìm được người giúp việc phù hợp?',
        answer: 'Trả lời: Bạn có thể tìm kiếm người giúp việc bằng cách sử dụng bộ lọc theo kỹ năng, địa điểm và đánh giá từ cộng đồng người dùng.'
      },
      {
        question: '3. Làm thế nào để tìm được người giúp việc phù hợp?',
        answer: 'Trả lời: Bạn có thể tìm kiếm người giúp việc bằng cách sử dụng bộ lọc theo kỹ năng, địa điểm và đánh giá từ cộng đồng người dùng.'
      },
      {
        question: '4. Tôi cần phải làm gì để đăng ký tài khoản?',
        answer: 'Trả lời: Để đăng ký, bạn cần cung cấp địa chỉ email hợp lệ và tạo mật khẩu cho tài khoản của bạn.'
      },
      {
        question: '5. Làm thế nào để cập nhật thông tin cá nhân của tôi?',
        answer: 'Trả lời: Bạn có thể truy cập vào phần "Hồ sơ của tôi" trong tài khoản của mình để chỉnh sửa hoặc cập nhật thông tin cá nhân.'
      },
      {
        question: '6. Làm thế nào để thanh toán cho dịch vụ của người giúp việc?',
        answer: 'Trả lời: Bạn có thể sử dụng các phương thức thanh toán trực tuyến như thẻ tín dụng, ví điện tử hoặc chuyển khoản ngân hàng để thanh toán cho người giúp việc.'
      },
      {
        question: '7. Làm sao để biết chi phí cụ thể cho một công việc cần người giúp việc?',
        answer: 'Trả lời: Chi phí có thể thay đổi dựa trên loại công việc, thời gian và khu vực. Bạn có thể xem trước các khoản chi phí dự kiến khi đăng công việc để có cái nhìn tổng quan.'
      },
      {
        question: '8. Làm thế nào để đảm bảo an toàn khi sử dụng dịch vụ?',
        answer: 'Trả lời: Chúng tôi cung cấp hệ thống đánh giá, đánh giá từ người dùng trước và hỗ trợ khách hàng liên tục để đảm bảo an toàn và chất lượng dịch vụ.'
      },
      {
        question: '9. Nếu có vấn đề xảy ra, tôi nên làm gì?',
        answer: 'Trả lời: Bạn nên liên hệ ngay với chúng tôi qua trang hỗ trợ hoặc gửi email thông qua thông tin liên hệ được cung cấp để chúng tôi có thể hỗ trợ và giải quyết vấn đề của bạn.'
      },
      {
        question: '10. Làm thế nào để đánh giá người giúp việc sau khi công việc hoàn thành?',
        answer: 'Trả lời: Sau khi công việc kết thúc, bạn có thể đánh giá người giúp việc và chia sẻ trải nghiệm của mình để giúp cộng đồng người dùng có cái nhìn chân thực về họ.'
      },

  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div className="faq">
    <h1>FAQ</h1>
      {faqs.map((faq, index) => (
        <div className={`faq-item ${faq.open ? 'open' : ''}`} key={index} onClick={() => toggleFAQ(index)}>
          <div className="faq-question">{faq.question}</div>
          <div className="faq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
