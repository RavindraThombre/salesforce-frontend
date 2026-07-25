export interface Testimonial {
  _id: string;
  name: string;
  review: string;
  rating: number;
}

export interface SaveTestimonialDto {
  name: string;
  review: string;
  rating: number;
}

export interface UpdateTestimonialDto extends SaveTestimonialDto {
  _id: string;
}

export interface TestimonialStats {
  total: number;
  averageRating: number;
  fiveStarCount: number;
}
