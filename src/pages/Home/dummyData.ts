export interface DiaDiem {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

// Tạo một danh sách đối tượng địa điểm
export const dummyData: DiaDiem[] = [
  {
    name: 'Quán Cà Phê Góc Phố',
    description: 'Quán cà phê yên bình với không gian thoáng đãng, phù hợp cho những buổi gặp gỡ bạn bè.',
    latitude: 10.7628,
    longitude: 106.6815,
  },
  {
    name: 'Nhà Hàng Đặc Sản Miền Nam',
    description: 'Nhà hàng phục vụ các món đặc sản miền Nam Việt Nam, không gian ấm cúng và phục vụ chuyên nghiệp.',
    latitude: 10.764,
    longitude: 106.6828,
  },
  {
    name: 'Công Viên Thảo Cầm Viên',
    description: 'Công viên lớn với nhiều loại cây cỏ, hồ cá và khu vui chơi, là điểm đến lý tưởng cho gia đình.',
    latitude: 10.7615,
    longitude: 106.6809,
  },
  {
    name: 'Trung Tâm Mua Sắm City Mart',
    description: 'Trung tâm mua sắm đa dạng sản phẩm, từ thời trang đến điện tử, thuận tiện cho việc mua sắm.',
    latitude: 10.7638,
    longitude: 106.6839,
  },
  {
    name: 'Nhà Thờ Hòa Bình',
    description: 'Nhà thờ lịch sử với kiến trúc đẹp, là điểm du lịch và tâm linh quan trọng trong thành phố.',
    latitude: 10.7649,
    longitude: 106.6807,
  },
  {
    name: 'Phố Đêm Bùi Viện',
    description: 'Khu phố đêm sầm uất với nhiều quán bar, nhà hàng và hoạt động văn hóa, thích hợp cho giới trẻ.',
    latitude: 10.7632,
    longitude: 106.6902,
  },
  {
    name: 'Bảo Tàng Mỹ Thuật TP.Hồ Chí Minh',
    description: 'Bảo tàng hiện đại trưng bày nhiều tác phẩm nghệ thuật độc đáo và đa dạng từ các nghệ sĩ nổi tiếng.',
    latitude: 10.7596,
    longitude: 106.682,
  },
  {
    name: 'Hồ Bán Nguyệt',
    description: 'Hồ nước lớn được bảo quản tốt, có đường dạo quanh phù hợp cho những buổi tập thể dục buổi sáng.',
    latitude: 10.7655,
    longitude: 106.6828,
  },
  {
    name: 'Nhà Hát Lớn',
    description: 'Nhà hát lớn nổi tiếng với kiến trúc hoành tráng, là nơi biểu diễn nghệ thuật và văn hóa cao cấp.',
    latitude: 10.7585,
    longitude: 106.6851,
  },
  {
    name: 'Chợ Bàn Cờ',
    description:
      'Chợ truyền thống với đa dạng sản phẩm từ thực phẩm đến đồ điện tử, là nơi mua sắm tích cực của người dân.',
    latitude: 10.7705,
    longitude: 106.6942,
  },
];

export interface AdBoardInterface {
  name: string;
  description: string;
  size: string;
  quantity: number;
  form: string;
  class: string;
}

export const dummyBoardList: AdBoardInterface[] = [
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 10m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 1.2m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 10m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 1.2m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 10m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
  {
    name: 'Trụ, cụm pano',
    description: 'Đồng khởi - Nguyễn Du (Sở văn hóa và thể thao)',
    size: '2.5m x 1.2m',
    quantity: 1,
    form: 'Cổ động chính trị',
    class: 'Đất cong/Công viên/hành lang an toàn giao thông',
  },
];
