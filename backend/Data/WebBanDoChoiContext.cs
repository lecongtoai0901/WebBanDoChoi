using System;
using System.Collections.Generic;
using DoAn_WebBanDoChoi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DoAn_WebBanDoChoi.Data
{
    public partial class WebBanDoChoiContext : DbContext
    {
        public WebBanDoChoiContext()
        {
        }

        public WebBanDoChoiContext(DbContextOptions<WebBanDoChoiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; } = null!;
        public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; } = null!;
        public virtual DbSet<DonHang> DonHangs { get; set; } = null!;
        public virtual DbSet<GioHang> GioHangs { get; set; } = null!;
        public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;
        public virtual DbSet<ThuongHieu> ThuongHieus { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=WebBanDoChoi;Username=postgres;Password=123456");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Makh)
                    .HasName("account_pkey");

                entity.ToTable("account");

                entity.HasIndex(e => e.Email, "account_email_key")
                    .IsUnique();

                entity.Property(e => e.Makh).HasColumnName("makh");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(100)
                    .HasColumnName("ho_ten");

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(100)
                    .HasColumnName("mat_khau");

                entity.Property(e => e.NgayDangKy).HasColumnName("ngay_dang_ky");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.SoDienThoai)
                    .HasMaxLength(15)
                    .HasColumnName("so_dien_thoai");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("account_role_id_fkey");
            });

            modelBuilder.Entity<ChiTietDonHang>(entity =>
            {
                entity.HasKey(e => new { e.Madh, e.Masp })
                    .HasName("chi_tiet_don_hang_pkey");

                entity.ToTable("chi_tiet_don_hang");

                entity.Property(e => e.Madh).HasColumnName("madh");

                entity.Property(e => e.Masp).HasColumnName("masp");

                entity.Property(e => e.DonGia).HasColumnName("don_gia");

                entity.Property(e => e.SoLuong).HasColumnName("so_luong");

                entity.HasOne(d => d.MadhNavigation)
                    .WithMany(p => p.ChiTietDonHangs)
                    .HasForeignKey(d => d.Madh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("chi_tiet_don_hang_madh_fkey");

                entity.HasOne(d => d.MaspNavigation)
                    .WithMany(p => p.ChiTietDonHangs)
                    .HasForeignKey(d => d.Masp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("chi_tiet_don_hang_masp_fkey");
            });

            modelBuilder.Entity<ChiTietGioHang>(entity =>
            {
                entity.HasKey(e => new { e.Magh, e.Masp })
                    .HasName("chi_tiet_gio_hang_pkey");

                entity.ToTable("chi_tiet_gio_hang");

                entity.Property(e => e.Magh).HasColumnName("magh");

                entity.Property(e => e.Masp).HasColumnName("masp");

                entity.Property(e => e.DonGia).HasColumnName("don_gia");

                entity.Property(e => e.SoLuong).HasColumnName("so_luong");

                entity.HasOne(d => d.MaghNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.Magh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("chi_tiet_gio_hang_magh_fkey");

                entity.HasOne(d => d.MaspNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.Masp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("chi_tiet_gio_hang_masp_fkey");
            });

            modelBuilder.Entity<DonHang>(entity =>
            {
                entity.HasKey(e => e.Madh)
                    .HasName("don_hang_pkey");

                entity.ToTable("don_hang");

                entity.Property(e => e.Madh).HasColumnName("madh");

                entity.Property(e => e.DiaChiGiao)
                    .HasMaxLength(255)
                    .HasColumnName("dia_chi_giao");

                entity.Property(e => e.Makh).HasColumnName("makh");

                entity.Property(e => e.NgayDat)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("ngay_dat");

                entity.Property(e => e.TongTien).HasColumnName("tong_tien");

                entity.Property(e => e.TrangThai)
                    .HasMaxLength(50)
                    .HasColumnName("trang_thai");

                entity.HasOne(d => d.MakhNavigation)
                    .WithMany(p => p.DonHangs)
                    .HasForeignKey(d => d.Makh)
                    .HasConstraintName("don_hang_makh_fkey");
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.HasKey(e => e.Magh)
                    .HasName("gio_hang_pkey");

                entity.ToTable("gio_hang");

                entity.Property(e => e.Magh).HasColumnName("magh");

                entity.Property(e => e.Makh).HasColumnName("makh");

                entity.Property(e => e.NgayTao)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("ngay_tao");

                entity.HasOne(d => d.MakhNavigation)
                    .WithMany(p => p.GioHangs)
                    .HasForeignKey(d => d.Makh)
                    .HasConstraintName("gio_hang_makh_fkey");
            });

            modelBuilder.Entity<LoaiSanPham>(entity =>
            {
                entity.HasKey(e => e.MaLoai)
                    .HasName("loai_san_pham_pkey");

                entity.ToTable("loai_san_pham");

                entity.Property(e => e.MaLoai).HasColumnName("ma_loai");

                entity.Property(e => e.TenLoai)
                    .HasMaxLength(100)
                    .HasColumnName("ten_loai");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.RoleName, "role_role_name_key")
                    .IsUnique();

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(255)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.HasKey(e => e.Masp)
                    .HasName("san_pham_pkey");

                entity.ToTable("san_pham");

                entity.Property(e => e.Masp).HasColumnName("masp");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.HinhAnh)
                    .HasMaxLength(255)
                    .HasColumnName("hinh_anh");

                entity.Property(e => e.MaLoai).HasColumnName("ma_loai");

                entity.Property(e => e.Math).HasColumnName("math");

                entity.Property(e => e.MoTa).HasColumnName("mo_ta");

                entity.Property(e => e.NgayCapNhat)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("ngay_cap_nhat");

                entity.Property(e => e.NgayTao)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("ngay_tao");

                entity.Property(e => e.SoLuongTon).HasColumnName("so_luong_ton");

                entity.Property(e => e.Tensp)
                    .HasMaxLength(150)
                    .HasColumnName("tensp");

                entity.Property(e => e.TrangThai).HasColumnName("trang_thai");

                entity.HasOne(d => d.MaLoaiNavigation)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.MaLoai)
                    .HasConstraintName("san_pham_ma_loai_fkey");

                entity.HasOne(d => d.MathNavigation)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.Math)
                    .HasConstraintName("san_pham_math_fkey");
            });

            modelBuilder.Entity<ThuongHieu>(entity =>
            {
                entity.HasKey(e => e.Math)
                    .HasName("thuong_hieu_pkey");

                entity.ToTable("thuong_hieu");

                entity.Property(e => e.Math).HasColumnName("math");

                entity.Property(e => e.Tenth)
                    .HasMaxLength(100)
                    .HasColumnName("tenth");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
