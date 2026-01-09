import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import blogImg from '../../assets/img/blog/01.jpg'
import blogImg2 from '../../assets/img/blog/02.jpg'
import blogImg3 from '../../assets/img/blog/03.jpg'
import apiClient from "../../api/apiClient";

const BlogSingle = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        apiClient.get(`/blogs/${id}`).then(res => setBlog(res.data));
    }, [id]);

    if (!blog) return null;

    return (
        <>
            <Breadcrumb
                title="Blog Single"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Blog Single", active: true }
                ]}
            />

            <div className="blog-single-area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-single-wrapper">
                                <div className="blog-single-content">
                                    <div className="blog-thumb-img">
                                        {/* <img src={blogImg} className='img-fluid' alt="thumb" /> */}
                                        {blog.image && (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL_IMG}${blog.image}`}
                                                className="img-fluid mb-4"
                                                alt="blog"
                                            />
                                        )}
                                    </div>
                                    <div className="blog-info">
                                        <div className="blog-meta">
                                            <div className="blog-meta-left">
                                                <ul>
                                                    <li><i className="far fa-user"></i><a href="#">{blog.author} |{" "}</a></li>
                                                    <li><i className="far fa-comments"></i>{blog.comments} Comments</li>
                                                    {/* <li><i className="far fa-thumbs-up"></i>1.4k Like</li> */}
                                                </ul>
                                            </div>

                                        </div>
                                        <div className="blog-details">
                                            <h3 className="blog-details-title mb-20">
                                                {/* It is a long established fact that a reader */}
                                                {blog.title}
                                            </h3>
                                            {/* <p className="mb-10">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                            </p>

                                            <blockquote className="blockqoute">
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
                                                <h6 className="blockqoute-author">Mark Crawford</h6>
                                            </blockquote>
                                            <p className="mb-20">
                                                In a free hour when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.
                                            </p> */}

                                            <div
                                                className="blog-content"
                                                dangerouslySetInnerHTML={{ __html: blog.content }}
                                            />

                                            <hr />

                                        </div>

                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center justify-content-center m-auto">
                                        <div className="blog-comments">

                                            <div className="blog-comments-form">
                                                <h3>Leave A Comment</h3>
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Your Name*" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" placeholder="Your Email*" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <textarea className="form-control" rows="5" placeholder="Your Comment*"></textarea>
                                                            </div>
                                                            <button type="submit" className="theme-btn">Post Comment <i className="far fa-paper-plane"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSingle