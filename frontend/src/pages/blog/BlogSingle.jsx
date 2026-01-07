import React from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import blogImg from '../../assets/img/blog/01.jpg'
import blogImg2 from '../../assets/img/blog/02.jpg'
import blogImg3 from '../../assets/img/blog/03.jpg'

const BlogSingle = () => {
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
                    <div className="col-lg-8">
                        <div className="blog-single-wrapper">
                            <div className="blog-single-content">
                                <div className="blog-thumb-img">
                                    <img src={blogImg}  alt="thumb"/>
                                </div>
                                <div className="blog-info">
                                    <div className="blog-meta">
                                        <div className="blog-meta-left">
                                            <ul>
                                                <li><i className="far fa-user"></i><a href="#">Jean R Gunter</a></li>
                                                <li><i className="far fa-comments"></i>3.2k Comments</li>
												<li><i className="far fa-thumbs-up"></i>1.4k Like</li>
                                            </ul>
                                        </div>
                                   
                                    </div>
                                    <div className="blog-details">
                                        <h3 className="blog-details-title mb-20">It is a long established fact that a reader</h3>
                                        <p className="mb-10">
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                                        </p>
                                        
										<blockquote className="blockqoute">
											It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
                                            <h6 className="blockqoute-author">Mark Crawford</h6>
                                        </blockquote>
										<p className="mb-20">
											In a free hour when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.
										</p>


                                        <hr/>
										
                                    </div>
                                  
                                </div>
                                <div className="blog-comments">
                                   
                                    <div className="blog-comments-form">
                                        <h3>Leave A Comment</h3>
                                        <form action="#">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" placeholder="Your Name*"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" placeholder="Your Email*"/>
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
                    <div className="col-lg-4">
                        <aside className="sidebar-wrapper">
                            {/* search */}
                            <div className="widget search">
                                <h5 className="widget-title">Search</h5>
                                <form className="search-form">
                                    <input type="text" className="form-control" placeholder="Search Here..."/>
                                    <button type="submit"><i className="far fa-search"></i></button>
                                </form>
                            </div>
                             {/* category  */}
                            <div className="widget category">
                                <h5 className="widget-title">Category</h5>
                                <div className="category-list">
                                    <a href="#"><i className="far fa-arrow-right"></i>Online Courses<span>(10)</span></a>
                                    <a href="#"><i className="far fa-arrow-right"></i>Basic Knowledge<span>(15)</span></a>
                                    <a href="#"><i className="far fa-arrow-right"></i>Improve Your Skills<span>(20)</span></a>
                                    <a href="#"><i className="far fa-arrow-right"></i>Proffesionals Course<span>(30)</span></a>
                                    <a href="#"><i className="far fa-arrow-right"></i>Complete Course<span>(25)</span></a>
                                </div>
                            </div>
                            {/* recent post  */}
                            <div className="widget recent-post">
                                <h5 className="widget-title">Recent Post</h5>
                                <div className="recent-post-single">
                                    <div className="recent-post-img">
                                        <img src={blogImg} alt="thumb"/>
                                    </div>
                                    <div className="recent-post-bio">
                                        <h6><a href="#">There are many variations passages available</a></h6>
                                        <span><i className="far fa-clock"></i>Jan 1, 2026</span>
                                    </div>
                                </div>
                                <div className="recent-post-single">
                                    <div className="recent-post-img">
                                        <img src={blogImg2} alt="thumb"/>
                                    </div>
                                    <div className="recent-post-bio">
                                        <h6><a href="#">There are many variations passages available</a></h6>
                                        <span><i className="far fa-clock"></i>Jan 2, 2026</span>
                                    </div>
                                </div>
                                <div className="recent-post-single">
                                    <div className="recent-post-img">
                                        <img src={blogImg3} alt="thumb"/>
                                    </div>
                                    <div className="recent-post-bio">
                                        <h6><a href="#">There are many variations passages available</a></h6>
                                        <span><i className="far fa-clock"></i>Jan 3, 2026</span>
                                    </div>
                                </div>
                            </div>
                            {/* social share  */}
                            <div className="widget social-share">
                                <h5 className="widget-title">Follow Us</h5>
                                <div className="social-share-link">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#"><i className="fab fa-dribbble"></i></a>
                                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                      
                        </aside>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BlogSingle